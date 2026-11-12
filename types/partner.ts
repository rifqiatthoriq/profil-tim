@'
export interface PartnerCompany {
  name: string;
  title: string;
  department: string;
}

export interface PartnerUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: PartnerCompany;
}

export interface PartnerApiResponse {
  users: PartnerUser[];
  total: number;
}
'@ | Set-Content -Path "types\partner.ts" -Encoding UTF8