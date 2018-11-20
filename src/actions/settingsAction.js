import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION } from './types';

export const setDisabledBalanceOnAdd = () => {
  //get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.disabledBalanceOnAdd = !settings.disabledBalanceOnAdd;
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disabledBalanceOnAdd
  }
}

export const setDisabledBalanceOnEdit = () => {
  const settings = JSON.parse(localStorage.getItem("setting"));
  settings.disabledBalanceOnEdit = !settings.disabledBalanceOnEdit;
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disabledBalanceOnEdit
  }
}

export const setAllowRegistration = () => {
  const settings = JSON.parse(localStorage.getItem("setting"));
  settings.allowRegistration = !settings.allowRegistration;
  localStorage.setItem('settings', JSON.stringify(settings));
  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  }
}