'use client';

import { Avatar, Box, Chip, Divider, Rating, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import { Product } from 'src/types/product';

export default function ProductReviews() {
  const { reviews, rating, reviewCount } = useDetailDataContext<Product>();

  // Default reviews if not provided
  const defaultReviews = [
    {
      id: '1',
      userName: 'Nguyễn Văn A',
      avatar: '',
      rating: 5,
      date: '15/12/2024',
      comment: 'Sản phẩm rất đẹp, chất lượng tốt. Dịch vụ giao hàng nhanh chóng, nhân viên nhiệt tình. Tôi rất hài lòng!',
      verified: true,
    },
    {
      id: '2',
      userName: 'Trần Thị B',
      avatar: '',
      rating: 5,
      date: '10/12/2024',
      comment: 'Tuyệt vời! Đúng như mô tả, giá cả hợp lý. Sẽ quay lại mua tiếp.',
      verified: true,
    },
    {
      id: '3',
      userName: 'Lê Văn C',
      avatar: '',
      rating: 4,
      date: '05/12/2024',
      comment: 'Sản phẩm tốt, nhưng giao hàng hơi chậm một chút. Nhìn chung là hài lòng.',
      verified: false,
    },
    {
      id: '4',
      userName: 'Phạm Thị D',
      avatar: '',
      rating: 5,
      date: '01/12/2024',
      comment: 'Chất lượng vượt mong đợi! Rất đáng giá tiền. Cảm ơn shop!',
      verified: true,
    },
  ];

  const reviewsList = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const totalReviews = reviewCount || reviewsList.length;
  const averageRating = rating || 4.5;

  // Calculate rating distribution from reviews
  const calculateDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsList.forEach((review) => {
      const r = Math.round(review.rating);
      if (r >= 1 && r <= 5) {
        dist[r as keyof typeof dist]++;
      }
    });
    return dist;
  };

  const ratingStats = {
    total: totalReviews,
    average: averageRating,
    distribution: calculateDistribution(),
  };

  return (
    <Box>
      <Typography variant='h6' sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
        Đánh giá sản phẩm
      </Typography>

        {/* Rating Summary */}
        <Box sx={{ display: 'flex', gap: 4, mb: 4, pb: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h3' sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
              {ratingStats.average}
            </Typography>
            <Rating value={ratingStats.average} readOnly size='large' precision={0.5} />
            <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
              {ratingStats.total} đánh giá
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Stack spacing={1}>
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingStats.distribution[star as keyof typeof ratingStats.distribution];
                const percentage = (count / ratingStats.total) * 100;
                return (
                  <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant='body2' sx={{ minWidth: 40 }}>
                      {star} <StarIcon sx={{ fontSize: 16, color: 'warning.main', verticalAlign: 'middle' }} />
                    </Typography>
                    <Box sx={{ flex: 1, height: 8, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          width: `${percentage}%`,
                          height: '100%',
                          bgcolor: 'warning.main',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </Box>
                    <Typography variant='body2' sx={{ minWidth: 40, color: 'text.secondary' }}>
                      {count}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>

        {/* Reviews List */}
        <Stack spacing={3}>
          {reviewsList.map((review) => (
            <Box key={review.id}>
              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  {review.userName.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                      {review.userName}
                    </Typography>
                    {review.verified && (
                      <Chip
                        label='Đã mua hàng'
                        size='small'
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          bgcolor: 'success.light',
                          color: 'success.dark',
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={review.rating} readOnly size='small' />
                    <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                      {review.date}
                    </Typography>
                  </Box>
                  <Typography variant='body2' sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {review.comment}
                  </Typography>
                </Box>
              </Box>
              {review.id !== reviewsList[reviewsList.length - 1]?.id && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Stack>

        {/* Load More Button */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography
            variant='body2'
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Xem thêm đánh giá ({Math.max(0, ratingStats.total - reviewsList.length)} đánh giá khác)
          </Typography>
        </Box>
    </Box>
  );
}

