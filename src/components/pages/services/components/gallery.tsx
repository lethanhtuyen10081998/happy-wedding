import { Box, Card, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import variables from 'src/themes/variables';

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
    <Card sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '4/3',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${gallery[currentImageIndex] || '/placeholder.svg?height=500&width=800'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            opacity: 0.6,
            zIndex: 0,
          },
        }}
      >
        <Image
          key={currentImageIndex}
          fill
          src={gallery[currentImageIndex] || '/placeholder.svg?height=500&width=800'}
          alt={`${title} - Ảnh ${currentImageIndex + 1}`}
          style={{
            objectFit: 'contain',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            borderRadius: variables.borderRadius,
            zIndex: 1,
          }}
        />

        {/* Nút điều hướng trái */}
        {gallery.length > 1 && (
          <IconButton
            onClick={prevImage}
            sx={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: 'text.primary',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'common.white',
                transform: 'translateY(-50%) scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronLeft size={24} />
          </IconButton>
        )}

        {/* Nút điều hướng phải */}
        {gallery.length > 1 && (
          <IconButton
            onClick={nextImage}
            sx={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: 'text.primary',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'common.white',
                transform: 'translateY(-50%) scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronRight size={24} />
          </IconButton>
        )}

        {/* Số thứ tự ảnh */}
        {gallery.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
              zIndex: 2,
            }}
          >
            {currentImageIndex + 1} / {gallery.length}
          </Box>
        )}
      </Box>

      {gallery.length > 1 && (
        <Box
          sx={{
            paddingY: '12px',
            paddingX: '8px',
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey.300',
              borderRadius: 2,
            },
          }}
        >
          {[...gallery].map((image, index) => (
            <Box
              key={index}
              sx={{
                width: '80px',
                height: '80px',
                borderRadius: 1.5,
                cursor: 'pointer',
                border: (theme) => (index === currentImageIndex ? `3px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.grey[300]}`),
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                opacity: index === currentImageIndex ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
                  borderColor: 'primary.main',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => {
                setCurrentImageIndex(index);
                setFade(false);
              }}
            />
          ))}
        </Box>
      )}
    </Card>
  );
}
