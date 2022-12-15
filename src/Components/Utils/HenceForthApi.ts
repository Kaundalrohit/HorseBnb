// import { upload } from "@testing-library/user-event/dist/upload";
import _superagent from "superagent";
const SuperagentPromise = require("superagent-promise");
// import pagination from "../context/reducers/pagination";
const superagent = SuperagentPromise(_superagent, global.Promise);
const API_ROOT = " https://horsebnb.com:3001/v1/api";
const BUCKET_ROOT = "https://horsebnb.s3.us-east-2.amazonaws.com/Uploads/"; //live
const API_FILE_ROOT_MEDIUM = `${BUCKET_ROOT}Images/Medium/`;
const API_FILE_ROOT_SMALL = `${BUCKET_ROOT}Images/Small/`;
const API_FILE_ROOT_ORIGINAL = `${BUCKET_ROOT}Images/Original/`;
// const API_FILE_ROOT_AUDIO = `${BUCKET_ROOT}audio/`;
// const API_FILE_ROOT_VIDEO = `${BUCKET_ROOT}video/`;
// const API_FILE_ROOT_DOCUMENTS = `${BUCKET_ROOT}documents/`;
// const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;
let token: any = null;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set("Authorization", `${token}`);
  }
};
// let limit = 10;
const requests = {
  del: (url: any) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: any) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: any, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url: any, body: any) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: any, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  file: (url: any, key: string, file: any) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .attach(key, file)
      .use(tokenPlugin)
      .then(responseBody),
};

const listing = {
  querylisting: (pub_type: number, perPage: number, page: number) =>
    requests.get(`/listings/query?pub_type=${pub_type}&perPage=${perPage}&page=${page}`)
}
const hostListing = {
  queryListing: (host_id: any, perPage: number, page: number) =>
    requests.get(`/host/listing?host_id=${host_id}&perPage=${perPage}&page=${page}`)
}

const uploadAdImg = {
  UploadAdImage: (key: string, file: any) =>
    requests.file(
      `/upload/aws?storageType=2&environment=3&isDefaultAsset=0`, key, file
    )
}

const reviewListing = {
  bookingReviews: (listingId: number) =>
    requests.get(
      `/bookings/reviews?listingId=${listingId}&state=public&include=author`
    )

}

const Auth = {
  availabiltycreate: (info: any) =>
    requests.post("/availability_exceptions/create", info),
  bookingListid: (id: string | undefined) =>
    requests.get(`/listings/show?id=${id}`),
  changespassword: (info: any) =>
    requests.post("/current_user/change_password", info),
  changePassword: (info: any) => requests.put("admin/change-password", info),
  checkOtp: (info: any) => requests.post("check-email-otp", info),
  closeListing: (id: any) => requests.post("/own_listings/close", id),
  createdraftlisting: (info: any) =>
    requests.post("/own_listings/create_draft", info),
  editdata: (info: any) => requests.post("/current_user/update_profile", info),
  emailVerify: (info: any) =>
    requests.post("/current_user/send_verification_email", info),
  Equestrian: () => requests.get("/listings/query?pub_type=3&perPage=8&page=1"),
  forgotPassword: (info: any) => requests.post("forgot-password", info),
  getdata: () => requests.get("/current_user/show"),
  getalllisting: () =>
    requests.get("/listings/query?pub_type=1&perPage=8&page=1"),
  Guestgetalllisting: () =>
    requests.get("/listings/query?pub_type=4&perPage=8&page=1"),
  login: (info: any) => requests.post("/login", info),
  Listid: (id: string | undefined) =>
    requests.get(`/own_listings/show?id=${id}`),
  listedalltype: () => requests.get("/own_listings/query?perPage=10&page=1"),
  montnlygetalllisting: () =>
    requests.get("/listings/query?pub_type=2&perPage=8&page=1"),
  publishListing: (info: any) =>
    requests.post(`/own_listings/publish_draft`, info),
  resetPassword: (info: any) => requests.post("reset/password", info),
  signup: (info: any) => requests.post("/current_user/create", info),
  Updatedlisting: (info: any) => requests.post("/own_listings/update", info),
  Uploadimage: (key: string, file: any) =>
    requests.file(
      `/upload/aws?storageType=5&environment=2&isDefaultAsset=0`, key, file
    ),
  updateUserProfile: (info: any) =>
    requests.post("/current_user/update_profile", info),
  hostProfile: (host_id: any) =>
    requests.get(`/host/profile?host_id=${host_id}`),
};

// Uploadimage: (key: string, file: any, storageType: number, environment: number) =>
//   requests.file(
//     `/upload/aws?storageType=${storageType}&environment=${environment}&isDefaultAsset=0`, key, file
//   ),

// eslint-disable-next-line
export default {
  // token,
  // ContactUs,
  // Divident,
  // Faq,
  // Reports,
  Auth,
  listing,
  uploadAdImg,
  hostListing,
  reviewListing,

  // Administrator,
  // Staff,
  // Common,
  // Profile,
  // Dashboard,
  // Facility,
  // Listing,
  // Transaction,
  // PromoCode,
  // User,
  // Policies,
  // Creator,
  // Message,
  // Nfts,
  API_ROOT,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_ORIGINAL,
  // API_FILE_ROOT_VIDEO,
  setToken: (_token: any) => {
    token = _token;
  },
};
