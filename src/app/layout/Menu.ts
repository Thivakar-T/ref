import {MenuItem} from './menu.module';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Home',
        link: '/dashboard',
    },
    {
        id: 2,
        label: 'Project Manager',
        link: '/dashboard/managerList',
    },
    {
        id: 3,
        label: 'Site Engineer',
        link: '/dashboard/siteEngineer',
    },
    {
        id: 4,
        label: 'Owner',
        link: '/dashboard/owner',
    },
    {
        id: 5,
        label: 'contract',
        link: '/dashboard/contract-workers',
    },
    {
        id: 6,
        label: 'contract',
        link: '/dashboard/contract-workers',
    },
    {
        id: 7,
        label: 'Site Creation',
        link: '/dashboard/SiteCreationList',
    },

   {
    id: 2,
    label2: 'Add Vendor',
    subItems: [
   
    {
        id: 1,
        label2: 'Vendor',
        link: '/dashboard/vendorList',
        parentId: 2,
    },
    {
        id: 2,
        label2: 'VendorWise Purchase',
        link: '/dashboard/vendorPurchaseList',
        parentId: 2
    },
]
},

//--------------------------------------------------------
{
    id: 3,
    label2: 'Master',
    subItems: [
    {
        id: 3,
        label2: 'Material',
        link: '/dashboard/MaterialType',
    },
]
}

]
