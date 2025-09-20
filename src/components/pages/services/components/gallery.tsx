import { Box, Card, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Gallery({ gallery, title }: { gallery: string[]; title: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextImage = () => {
    setFade(false);
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setFade(false);
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Mỗi khi đổi ảnh -> trigger hiệu ứng fade-in
  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => setFade(true), 300); // bật lại opacity sau một chút
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <Card sx={{ overflow: 'hidden' }}>
      {/* Container giữ tỉ lệ ảnh */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16/9', // Giữ tỉ lệ 16:9 cho ảnh
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Image
          key={currentImageIndex}
          fill
          src={gallery[currentImageIndex] || '/placeholder.svg?height=500&width=800'}
          alt={`${title} - Ảnh ${currentImageIndex + 1}`}
          style={{
            objectFit: 'cover',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        {/* Nút điều hướng trái */}
        <IconButton
          onClick={prevImage}
          sx={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            '&:hover': { backgroundColor: (theme) => theme.palette.primary.dark },
          }}
        >
          <ChevronLeft size={24} />
        </IconButton>

        {/* Nút điều hướng phải */}
        <IconButton
          onClick={nextImage}
          sx={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            '&:hover': { backgroundColor: (theme) => theme.palette.primary.dark },
          }}
        >
          <ChevronRight size={24} />
        </IconButton>

        {/* Số thứ tự ảnh */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '14px',
          }}
        >
          {currentImageIndex + 1} / {gallery.length}
        </Box>
      </Box>

      {/* Thumbnails */}
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
        }}
      >
        {gallery.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: (theme) => (index === currentImageIndex ? `3px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.grey[200]}`),
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flexShrink: 0,
            }}
            onClick={() => {
              setCurrentImageIndex(index);
              setFade(false);
            }}
          />
        ))}
      </Box>
    </Card>
  );
}
