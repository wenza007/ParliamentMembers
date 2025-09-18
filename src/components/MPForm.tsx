import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MPSchema } from '../schema/mpschema';
import type { MPFormData } from '../schema/mpschema';
import { useState, useEffect } from 'react';

interface MPFormProps {
  onSubmit: (data: MPFormData) => void;
  defaultValues?: MPFormData;
  onCancel: () => void;
  onBack: () => void;
  isReadOnly: boolean;
}

const MPForm = ({ onSubmit, defaultValues, onCancel, onBack, isReadOnly }: MPFormProps) => {
  const [photoUploadType, setPhotoUploadType] = useState<'url' | 'upload'>('url');
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<MPFormData>({
    resolver: zodResolver(MPSchema),
    defaultValues: { ...defaultValues }
  });

  const watchedPhoto = watch('photo');

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setPhotoUploadType(defaultValues.photoDisplay?.startsWith('http') || defaultValues.photoDisplay?.startsWith('data:image') ? 'url' : 'url');
    }
  }, [defaultValues, reset]);
  
  const handleFormSubmit = (data: MPFormData) => {
    onSubmit(data);
    
    reset({
      prefix: '',
      firstName: '',
      lastName: '',
      photo: '',
      photoDisplay: '',
      workHistory: '',
      pastWorks: '',
      ministerialPosition: '',
      ministry: '',
      politicalParty: '',
    });
    setPhotoUploadType('url');
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {defaultValues ? (isReadOnly ? 'รายละเอียดสมาชิก' : 'แก้ไขข้อมูลสมาชิก') : 'เพิ่มสมาชิกใหม่'}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1"> 
          <label className="block text-gray-700 font-semibold mb-1">คำนำหน้า</label>
          <select disabled={isReadOnly} {...register('prefix')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500">
            <option value="">เลือก</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.prefix && <p className="text-red-500 text-sm mt-1">{errors.prefix.message}</p>}
        </div>
        <div className="md:col-span-1">
          <label className="block text-gray-700 font-semibold mb-1">ชื่อ</label>
          <input disabled={isReadOnly} type="text" {...register('firstName')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">นามสกุล</label>
          <input disabled={isReadOnly} type="text" {...register('lastName')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">รูปถ่าย (2 นิ้ว)</label>
          {!isReadOnly && (
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="photo-url"
                  name="photo-type"
                  checked={photoUploadType === 'url'}
                  onChange={() => setPhotoUploadType('url')}
                  className="mr-2 accent-blue-500"
                />
                <label htmlFor="photo-url" className="text-gray-700">ใช้ URL</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="photo-upload"
                  name="photo-type"
                  checked={photoUploadType === 'upload'}
                  onChange={() => setPhotoUploadType('upload')}
                  className="mr-2 accent-blue-500"
                />
                <label htmlFor="photo-upload" className="text-gray-700">อัปโหลดรูปภาพ</label>
              </div>
            </div>
          )}
          {photoUploadType === 'url' ? (
            <input
              disabled={isReadOnly}
              type="text"
              {...register('photo')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="วาง URL รูปภาพที่นี่"
            />
          ) : (
            <input
              disabled={isReadOnly}
              type="file"
              {...register('photo')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              accept="image/*"
            />
          )}
          {typeof errors.photo?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
          
          {(defaultValues?.photoDisplay || (watchedPhoto && watchedPhoto.length > 0) || (typeof watchedPhoto === 'string' && watchedPhoto)) && (
            <div className="mt-4 flex justify-center">
              <img
                src={
                  photoUploadType === 'url' ? 
                    (typeof watchedPhoto === 'string' && watchedPhoto.length > 0 ? watchedPhoto : defaultValues?.photoDisplay) : 
                    (watchedPhoto && watchedPhoto.length > 0 && watchedPhoto[0] instanceof File ? URL.createObjectURL(watchedPhoto[0]) : defaultValues?.photoDisplay)
                }
                alt="รูปถ่าย"
                className="w-24 h-32 object-cover rounded-lg border-4 border-blue-500 shadow-md transition-transform transform hover:scale-105 duration-300"
              />
            </div>
          )}
        </div>
        
        <div className="md:col-span-4">
          <label className="block text-gray-700 font-semibold mb-1">ประวัติการทำงาน</label>
          <textarea disabled={isReadOnly} {...register('workHistory')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" rows={3}></textarea>
        </div>
        <div className="md:col-span-4">
          <label className="block text-gray-700 font-semibold mb-1">ผลงานที่ผ่านมา</label>
          <textarea disabled={isReadOnly} {...register('pastWorks')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" rows={3}></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">ตำแหน่ง</label>
          <input disabled={isReadOnly} type="text" {...register('ministerialPosition')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">กระทรวง</label>
          <input disabled={isReadOnly} type="text" {...register('ministry')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">สังกัดพรรคการเมือง</label>
          <input disabled={isReadOnly} type="text" {...register('politicalParty')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500" />
        </div>

        <div className="col-span-1 md:col-span-4 flex justify-end items-center mt-4">
          {!isReadOnly ? (
            <>
              <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                {defaultValues ? 'บันทึกการแก้ไข' : 'เพิ่มสมาชิก'}
              </button>
              {defaultValues && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="ml-4 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
                >
                  ยกเลิก
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md"
            >
              <i className="fas fa-arrow-left mr-2"></i> กลับไปหน้ารายชื่อ
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MPForm;