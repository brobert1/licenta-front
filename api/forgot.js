import { axios, toaster } from '@lib';

const forgot = async (ref, data) => {
  try {
    // execute google recaptcha
    data['g-recaptcha-response'] = await ref.current.executeAsync();

    // execute main action
    await axios.post('forgot', data);

    // notify user and other actions
    toaster.success('You will receive an email with reset instructions');
  } catch (err) {
    toaster.error(err?.message || 'We could not send reset instructions for this email');

    // reset google recaptcha on failed attempt
    ref.current?.reset?.();
  }
};

export default forgot;
