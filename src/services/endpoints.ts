// eslint-disable-next-line import/no-anonymous-default-export
export default {
  LOCAL_API_PREFIX: '/api',
  LOCAL_API_AI_PREFIX: '/api/ai',
  LOCAL_API_N8N_PREFIX: '/api/n8n',
  LOCAL_API_PREFIX_AUTH: '/authenticated',
  S3_GENERATE_URL: '/s3/generate-url',
  S3_DELETE_URL: '/s3/delete-url',
  SIGN_IN: '/sign-in',
  AGENCIES_REGISTER: '/agencies/register',
  SIGN_OUT: '/logout',
  SIGN_UP: '/sign-up',
  PROFILE: '/my-profile',
  REFRESH: '/token-refresh',

  //USER
  USER_LIST_TOUR_OF_USER: '/tour/get-list-tour-for-customer',
  USER_LIST_VISA_OF_USER: '/tour/get-list-visa-for-customer',

  //AI
  MANAGEMENT_AI_GENERATE_TOUR_INFORMATION: '/manager-ai/tour-ai/generate-tour-information',
  MANAGEMENT_AI_N8N_CHAT_AI: process.env.NEXT_PUBLIC_API_ENDPOINT_N8N_WEBHOOK,

  // Admin Settings
  ADMIN_SETTINGS_CATEGORIES_GET_LIST: '/admin/settings/categories/get-list',
  ADMIN_SETTINGS_CATEGORIES_GET_DETAIL: '/admin/settings/categories/get-detail',
  ADMIN_MANAGE_PRODUCTS_GET_LIST: '/admin/manage/products/get-list',
};
