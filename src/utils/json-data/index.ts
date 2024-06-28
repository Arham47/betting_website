import {
  CAP_ACCOUNT,  
  CAP_ADMIN, 
  CAP_BETTOR,
  CAP_COMPANY,
  CAP_MASTER,
  CAP_SUPER_ADMIN,
  CAP_SUPER_MASTER,
  LOWER_EMAIL,
  LOWER_LABEL_NOT_VALID,
  LOWER_LABLE_BETWEEN_MIN_MAX,
  LOWER_LABLE_REQUIRED,
  LOWER_NUMBER,
  NUM_STR_0,
  NUM_STR_1,
  NUM_STR_2,
  NUM_STR_3,
  NUM_STR_4,
  NUM_STR_5,
} from "@utils/const";

export const rolesJSONData = {
  currentRole: {
    name: "Company",
    role: "0",
    children: {
      currentRole: {
        name: "Super Admin",
        role: "1",
        children: {
          currentRole: {
            name: "Admin",
            role: "2",
            children: {
              currentRole: {
                name: "Super Master",
                role: "3",
                children: {
                  currentRole: {
                    name: "Master",
                    role: "4",
                    children: {
                      currentRole: {
                        name: "Bettor",
                        role: "5",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const roleNameTypeUserList = [
  {
    name: CAP_COMPANY,
    role: NUM_STR_0,
  },
  {
    name: CAP_SUPER_ADMIN,
    role: NUM_STR_1,
  },
  {
    name: CAP_ADMIN,
    role: NUM_STR_2,
  },
  {
    name: CAP_SUPER_MASTER,
    role: NUM_STR_3,
  },
  {
    name: CAP_MASTER,
    role: NUM_STR_4,
  },
  {
    name: CAP_BETTOR,
    role: NUM_STR_5,
  },
];

export const validateMessages = {
  required: LOWER_LABLE_REQUIRED,
  types: {
    email: `${LOWER_LABEL_NOT_VALID} ${LOWER_EMAIL}!"`,
    number: `${LOWER_LABEL_NOT_VALID} ${LOWER_NUMBER}!`,
  },
  number: {
    range: LOWER_LABLE_BETWEEN_MIN_MAX,
  },
};
export const jsonDataForLoadBalance =  [{
  balanceUpline: 0,
  cash: 0,
  creditRecieved: 0,
  creditRemaining: 0,
  plDownline: 0,
  users: 0
}]
export const marketNameArray = [
  {
    type: 7,
    name :'Fancy',
  },
  {
    type: 8,
    name: 'BookMaker'
  },
  {
    type: 11,
    name: 'Toss'
  },
  {
    type:12,
    name:'Cup'
  },
  {
    type: 35,
    name: 'TiedMatch'
  }
]

export const colorList = [
  '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
   '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
   '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
   '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
   '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
   '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
   '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
  '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
  '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
  '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
  '#10A8B0',
];