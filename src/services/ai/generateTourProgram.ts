import { useQuery } from '@tanstack/react-query';
import { internalApiInstanceAI } from 'src/providers/authProvider';
import endpoints from 'src/services/endpoints';

export type Request = {
  prompt: string;
};

export type Response = {
  data: string;
};

export function getGenerateTourProgram(request: Request): Promise<ReadableStream> {
  return internalApiInstanceAI.post(
    endpoints.MANAGEMENT_AI_GENERATE_TOUR_PROGRAM,
    {
      ...request,
    },
    {
      responseType: 'stream',
    },
  );
}

const useGenerateTourProgram = (request: Request) => {
  const { data, ...others } = useQuery({
    queryKey: [endpoints.MANAGEMENT_AI_GENERATE_TOUR_PROGRAM, request],
    queryFn: () => getGenerateTourProgram(request),
  });
  return {
    ...others,
  };
};

export default useGenerateTourProgram;
