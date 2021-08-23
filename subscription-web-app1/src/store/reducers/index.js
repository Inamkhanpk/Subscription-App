import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import offerReducer from "./offerReducer";

 

export default combineReducers({
  auth: authReducer,
  company: companyReducer,
  offer: offerReducer,
});