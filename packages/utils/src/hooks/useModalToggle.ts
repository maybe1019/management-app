import React from 'react';

export const useModalToggle = (isVisible?: boolean) => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(
    !!isVisible
  );
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  return [isModalVisible, toggleModal] as const;
};
