// AspectBox.js
import Box from '@mui/material/Box';

/**
 * Props:
 * - ratio: number | string
 *     + number: ví dụ 1.777... (16/9) hoặc 1 (1:1)
 *     + string: '16:9' hoặc '4:3'
 * - children: nội dung sẽ nằm bên trong (bằng absolute và phủ đầy)
 * - sx/style/other props được truyền tiếp vào Box ngoài cùng
 */
const parseRatio = (ratio: number | string) => {
  if (!ratio) return 16 / 9;
  if (typeof ratio === 'number') return ratio;
  if (typeof ratio === 'string' && ratio.includes(':')) {
    const [w, h] = ratio.split(':').map(Number);
    if (w && h) return w / h;
  }
  const n = Number(ratio);
  return isFinite(n) && n > 0 ? n : 16 / 9;
};

export default function RatioBox({
  ratio = '16:9',
  children,
  style = {},
  ...rest
}: {
  ratio?: number | string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  rest?: any;
}) {
  const r = parseRatio(ratio);
  const paddingTop = `${100 / r}%`; // padding-top để tạo chiều cao theo tỉ lệ

  return (
    <Box
      {...rest}
      style={{
        width: '100%', // full theo parent
        position: 'relative', // chứa absolute child
        paddingTop, // tạo tỉ lệ
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Nội dung thật sự nằm ở đây, phủ đầy vùng "tỉ lệ" */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
