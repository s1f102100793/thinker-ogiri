import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import * as React from 'react';

interface LoadingModalProps {
  open: boolean;
}

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: '#bfbfbf',
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#000000',
  },
}));

const LoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  return (
    <div
      style={{
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '3vh',
        position: 'relative',
        top: 0,
        height: '120vh',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ opacity: 0.5, fontSize: '3vh' }}>作成中</div>
      <div
        style={{
          width: '80%',
          maxWidth: 600,
        }}
      >
        <CustomLinearProgress />
      </div>
    </div>
  );
};

export default LoadingModal;
