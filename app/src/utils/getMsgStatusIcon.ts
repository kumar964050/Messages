const getMsgStatusIcon = (status: string) => {
  if (status === 'pending') return 'time-outline';
  else if (status === 'sent') return 'checkmark';
  else if (status === 'delivered') return 'checkmark-done';
  else if (status === 'seen') return 'checkmark-done';
  return 'time-outline';
};

export default getMsgStatusIcon;
