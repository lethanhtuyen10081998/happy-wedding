import { internalApiInstance } from 'src/providers/authProvider';
import endpoints from 'src/services/endpoints';

export type Request = {
  messagesHistory: { role: string; content: string }[];
  prompt: string;
};

export type Response = {
  data: string;
};

export function generateTourInformation(request: Request): Promise<Response> {
  return internalApiInstance.post(endpoints.LOCAL_API_PREFIX_AUTH, {
    url: endpoints.MANAGEMENT_AI_GENERATE_TOUR_INFORMATION,
    ...request,
  });
}
