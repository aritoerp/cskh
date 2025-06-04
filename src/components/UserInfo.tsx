import React from 'react';
import { UserInfo as UserInfoType } from '../types';

interface UserInfoProps {
  userInfo: UserInfoType | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  if (!userInfo) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500">
        Chọn một khách hàng để xem thông tin
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border-l border-gray-200">
      <div className="p-4 border-b border-gray-200" style={{height:"73px"}}>
        <h2 className="text-lg font-semibold text-gray-800">Thông tin người dùng</h2>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">MST</h3>
          <p className="text-lg font-semibold">{userInfo.taxCode}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Công ty</h3>
          <p className="text-lg font-semibold">{userInfo.companyName}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tóm tắt hội thoại trước đó</h3>
          <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
            {userInfo.notes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;