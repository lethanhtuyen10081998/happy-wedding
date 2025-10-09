import { useQuery } from '@tanstack/react-query';
import { UserProfile } from 'src/types/user';

import endpoints from '../endpoints';

export type Response = {
  data: UserProfile;
};

export function getProfile(): Promise<Response> {
  // return internalApiInstance.get(endpoints.LOCAL_API_PREFIX_AUTH, {
  //   params: {
  //     url: endpoints.PROFILE,
  //   },
  // });

  return new Promise((resolve) => {
    resolve({
      data: {
        fullName: 'Quản Lí',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        passportIssueDate: '1234567890',
        passportExpiryDate: '1234567890',
        visaNumber: '1234567890',
        countryCode: '1234567890',
        departmentCode: '1234567890',
        passport: '1234567890',
        customerId: '1234567890',
        factNo: '1234567890',
        branchNo: '1234567890',
        customerType: '1234567890',
        birthDate: '1234567890',
        cardNumber: '1234567890',
        note: '1234567890',
        title: '1234567890',
        faxNumber: '1234567890',
        address: '1234567890',
        password: '1234567890',
        createdBy: '1234567890',
        createdTime: '1234567890',
        updatedBy: '1234567890',
        updatedTime: '1234567890',
      },
    });
  });
}

const useGetProfile = () => {
  const { data, ...others } = useQuery({
    queryKey: [endpoints.PROFILE],
    queryFn: () => getProfile(),
  });

  return {
    data,
    ...others,
  };
};

export default useGetProfile;
