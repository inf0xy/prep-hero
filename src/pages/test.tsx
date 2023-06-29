import { useState } from 'react';
import SavedList from '@/components/problems/SavedList';
import Drawer from '@/components/reusables/Drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleSavedList } from '@/store';
import MobileUserMenu from '@/components/user/MobileUserMenu';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { savedListOpen } = useAppSelector((state) => state.navigate);
  const dispatch = useAppDispatch();

  return (
    <div
      className="bg-[#181818] text-[1.5rem]"
      style={{
        minHeight: '100vh'
      }}
    >
      {/* <MobileUserMenu /> */}
      <button
        className="btn btn-secondary absolute left-0 top-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open Drawer
      </button>
    </div>
  );
};

export default TestPage;
