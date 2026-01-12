import { Box, Card, Dialog, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import variables from 'src/themes/variables';

export default function Gallery({ gallery, title }: { gallery: string[]; title: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next image
      nextImage();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous image
      prevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto hide controls on mobile after 3 seconds
  useEffect(() => {
    if (!fullscreenOpen) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [fullscreenOpen, currentImageIndex]);

  const handleImageClick = () => {
    setShowControls((prev) => !prev);
  };

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

        {/* Nút xem fullscreen */}
        <IconButton
          onClick={() => {
            setFullscreenOpen(true);
            setShowControls(true);
          }}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
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
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Maximize2 size={20} />
        </IconButton>

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

      {/* Dialog Fullscreen */}
      <Dialog
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            m: 0,
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            borderRadius: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#000',
            touchAction: 'pan-y pinch-zoom',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${gallery[currentImageIndex] || '/placeholder.svg?height=500&width=800'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(30px)',
              opacity: 0.3,
              zIndex: 0,
            },
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Nút đóng */}
          <IconButton
            onClick={() => {
              setFullscreenOpen(false);
              setShowControls(true);
            }}
            sx={{
              position: 'absolute',
              top: { xs: '12px', sm: '24px' },
              right: { xs: '12px', sm: '24px' },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              borderRadius: '50%',
              width: { xs: '40px', sm: '48px' },
              height: { xs: '40px', sm: '48px' },
              zIndex: 3,
              opacity: showControls ? 1 : 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <X size={20} />
          </IconButton>

          {/* Ảnh fullscreen */}
          <Box
            onClick={handleImageClick}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              padding: { xs: '60px 16px', sm: '80px 100px' },
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <Box
              component='img'
              key={currentImageIndex}
              src={gallery[currentImageIndex] || '/placeholder.svg?height=500&width=800'}
              alt={`${title} - Ảnh ${currentImageIndex + 1}`}
              sx={{
                maxWidth: '100%',
                maxHeight: { xs: '100%', sm: 'calc(100vh - 160px)' },
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                opacity: fade ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                display: 'block',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'pan-y pinch-zoom',
              }}
              draggable={false}
            />
          </Box>

          {/* Nút điều hướng trái */}
          {gallery.length > 1 && (
            <IconButton
              onClick={prevImage}
              sx={{
                position: 'absolute',
                left: { xs: '8px', sm: '24px' },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '50%',
                width: { xs: '44px', sm: '56px' },
                height: { xs: '44px', sm: '56px' },
                zIndex: 2,
                opacity: showControls ? 1 : 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-50%) scale(1.1)',
                },
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
                right: { xs: '8px', sm: '24px' },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '50%',
                width: { xs: '44px', sm: '56px' },
                height: { xs: '44px', sm: '56px' },
                zIndex: 2,
                opacity: showControls ? 1 : 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-50%) scale(1.1)',
                },
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
                bottom: { xs: '16px', sm: '24px' },
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: { xs: '6px 12px', sm: '8px 16px' },
                borderRadius: '24px',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                zIndex: 2,
                opacity: showControls ? 1 : 0,
                transition: 'all 0.3s ease',
              }}
            >
              {currentImageIndex + 1} / {gallery.length}
            </Box>
          )}

          {/* Thumbnail strip ở dưới - chỉ hiện trên desktop */}
          {gallery.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '60px', sm: '80px' },
                left: '50%',
                transform: 'translateX(-50%)',
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                padding: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                backdropFilter: 'blur(8px)',
                zIndex: 2,
                maxWidth: '90%',
                overflowX: 'auto',
                opacity: showControls ? 1 : 0,
                transition: 'all 0.3s ease',
                '&::-webkit-scrollbar': {
                  height: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 2,
                },
              }}
            >
              {gallery.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: index === currentImageIndex ? '3px solid white' : '2px solid rgba(255, 255, 255, 0.3)',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    opacity: index === currentImageIndex ? 1 : 0.6,
                    '&:hover': {
                      opacity: 1,
                      borderColor: 'white',
                      transform: 'scale(1.1)',
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
        </Box>
      </Dialog>
    </Card>
  );
}
