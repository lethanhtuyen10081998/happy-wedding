import { Box, Card, Dialog, IconButton, Typography } from '@mui/material';
import { X } from 'lucide-react';
import Image from 'next/image';

interface SEOPreviewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  siteName?: string;
}

export default function SEOPreview({ open, onClose, title, description, imageUrl, url, siteName = 'Happy Wedding' }: SEOPreviewProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <Card sx={{ p: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
          <Typography variant='h6' fontWeight={600}>
            Preview SEO Content
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <X size={20} />
          </IconButton>
        </Box>

        <Box display='flex' flexDirection='column' gap={3}>
          {/* Facebook Preview */}
          <Box>
            <Typography variant='subtitle2' fontWeight={600} mb={1} color='text.secondary'>
              Facebook / LinkedIn Preview
            </Typography>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'white',
                maxWidth: '100%',
              }}
            >
              {imageUrl && (
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1.91/1',
                    position: 'relative',
                    bgcolor: 'grey.100',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </Box>
              )}
              <Box sx={{ p: 2 }}>
                <Typography
                  variant='caption'
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '0.5px',
                    mb: 0.5,
                  }}
                >
                  {siteName}
                </Typography>
                <Typography variant='h6' fontWeight={600} sx={{ mb: 0.5, lineHeight: 1.3 }}>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {description}
                </Typography>
                <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
                  {url}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Twitter Preview */}
          <Box>
            <Typography variant='subtitle2' fontWeight={600} mb={1} color='text.secondary'>
              Twitter Preview
            </Typography>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'white',
                maxWidth: '100%',
              }}
            >
              {imageUrl && (
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1.91/1',
                    position: 'relative',
                    bgcolor: 'grey.100',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </Box>
              )}
              <Box sx={{ p: 2 }}>
                <Typography variant='h6' fontWeight={600} sx={{ mb: 0.5, lineHeight: 1.3 }}>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {description}
                </Typography>
                <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
                  {url}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Meta Tags Info */}
          <Box>
            <Typography variant='subtitle2' fontWeight={600} mb={1} color='text.secondary'>
              Meta Tags
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.50',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                overflow: 'auto',
              }}
            >
              <Box mb={1}>
                <Typography component='span' fontWeight={600}>
                  Title:
                </Typography>{' '}
                {title}
              </Box>
              <Box mb={1}>
                <Typography component='span' fontWeight={600}>
                  Description:
                </Typography>{' '}
                {description}
              </Box>
              <Box mb={1}>
                <Typography component='span' fontWeight={600}>
                  Image:
                </Typography>{' '}
                {imageUrl || 'No image'}
              </Box>
              <Box mb={1}>
                <Typography component='span' fontWeight={600}>
                  URL:
                </Typography>{' '}
                {url}
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}

