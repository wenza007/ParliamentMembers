import { useState, useEffect } from 'react';
import type { MPFormData } from './schema/mpschema';
import MPForm from './components/MPForm';
import MPList from './components/MPList';
import Layout from './components/Layout';
import { mockMPs } from './data/mockMPs'; // นำเข้าข้อมูลตัวอย่างจากไฟล์ใหม่

function App() {
  const [mps, setMps] = useState<MPFormData[]>(() => {
    const savedMps = localStorage.getItem('mps');
    return savedMps ? JSON.parse(savedMps) : [];
  });
  useEffect(() => {
  localStorage.setItem('mps', JSON.stringify(mps));
}, [mps]);
  const [editingMp, setEditingMp] = useState<MPFormData | undefined>(undefined);
  const [viewingMp, setViewingMp] = useState<MPFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  // เพิ่ม State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 20;
  const processSave = (data: MPFormData, photoToSave: string | undefined) => {
    const newData = { ...data, photoDisplay: photoToSave };

    if (editingMp) {
      setMps(
        mps.map((mp) => (mp.id === editingMp.id ? { ...newData, id: editingMp.id } : mp))
      );
      setEditingMp(undefined);
      alert('บันทึกการแก้ไขข้อมูลสำเร็จ!');
    } else {
      setMps([...mps, { ...newData, id: Date.now() }]);
      alert('เพิ่มสมาชิกใหม่สำเร็จ!');
    }
  };

  const handleAddOrEdit = async (data: MPFormData) => {
    let photoToSave: string | undefined;

    try {
      if (data.photo && data.photo.length > 0 && data.photo[0] instanceof File) {
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(data.photo[0]);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
        photoToSave = base64String;
      } else {
        photoToSave = data.photo as string;
      }
      
      processSave(data, photoToSave);
    } catch (error) {
      console.error("Error processing photo:", error);
      alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
    }
  };

  const handleDelete = (id: number) => {
    setMps(mps.filter((mp) => mp.id !== id));
  };

  const handleEdit = (mp: MPFormData) => {
    setEditingMp(mp);
    setShowForm(true);
    setViewingMp(undefined);
  };
  
  const handleCancelEdit = () => {
    setEditingMp(undefined);
    setShowForm(false);
  };
  
  const handleViewDetails = (mp: MPFormData) => {
    setViewingMp(mp);
    setShowForm(true);
    setEditingMp(undefined);
  };

  const handleBackToList = () => {
    setViewingMp(undefined);
    setShowForm(false);
  };

  const toggleShowForm = () => {
      setShowForm(!showForm);
      if (!showForm) {
          setEditingMp(undefined);
          setViewingMp(undefined);
      }
  };

  // Logic สำหรับ Pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = mps.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(mps.length / membersPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // ฟังก์ชันสำหรับนำเข้าข้อมูลตัวอย่าง
  const handleImportMockData = () => {
    const mpsWithId = mockMPs.map((mp, index) => ({
      ...mp,
      id: Date.now() + index,
      photoDisplay: `https://i.pravatar.cc/150?u=${Date.now() + index}`
    }));
    setMps(mpsWithId);
    alert(`นำเข้าข้อมูล ส.ส. ${mpsWithId.length} คนสำเร็จแล้ว!`);
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleShowForm}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 shadow-md"
        >
          {showForm ? 'แสดงรายชื่อทั้งหมด' : 'เพิ่ม/แก้ไขสมาชิก'}
        </button>
        <button
          onClick={handleImportMockData}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-md ml-2 hover:bg-green-700 transition duration-200 shadow-md"
        >
          นำเข้าข้อมูลตัวอย่าง
        </button>
      </div>

      {showForm && (
        <MPForm
          onSubmit={handleAddOrEdit}
          defaultValues={editingMp || viewingMp}
          onCancel={handleCancelEdit}
          onBack={handleBackToList}
          isReadOnly={!!viewingMp}
        />
      )}

      {!showForm && (
        <MPList
          mps={currentMembers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Layout>
  );
}

export default App;