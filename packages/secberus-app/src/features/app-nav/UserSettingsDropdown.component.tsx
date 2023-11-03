import React from 'react';
import { signOut, ssoApi2 } from '@secberus/services';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';
import { useCallbackModal } from '../callback-modal';
import { SideNavDropdown } from './components/side-nav-dropdown/SideNavDropdown.component';
import { EditProfileModal } from './modals/edit-profile/EditProfileForm.component';
import { ChangePasswordForm } from './modals/change-password/ChangePasswordForm.component';
import { SideNavDropdownProps } from './components/side-nav-dropdown/SideNavDropdown.types';

export const UserSettingsDropdown = ({
  variant,
}: {
  variant?: SideNavDropdownProps['variant'];
}) => {
  const { name, family_name: familyName, email } = useSelf();
  const { data: ssoConfigData } = ssoApi2.useGetSsoConfigQuery(
    { email },
    { skip: !email }
  );

  const fullName = React.useMemo(
    () => `${name} ${familyName}`,
    [familyName, name]
  );

  const {
    showCallbackModal: showEditProfileModal,
    RenderCallbackModal: RenderEditProfileModal,
  } = useCallbackModal({
    renderModal: EditProfileModal,
  });

  const {
    showCallbackModal: showChangePasswordModal,
    RenderCallbackModal: RenderChangePasswordModal,
  } = useCallbackModal({
    renderModal: ChangePasswordForm,
  });

  const options = [
    {
      id: 'edit-profile',
      label: 'Edit profile',
      onClick: showEditProfileModal,
    },
    {
      id: 'change-password',
      label: 'Change password',
      onClick: showChangePasswordModal,
      show: !ssoConfigData?.sso,
    },
    {
      id: 'signout',
      label: 'Sign out',
      onClick: () => signOut({}),
    },
  ];

  return (
    <>
      <SideNavDropdown
        variant={variant}
        dividerTop
        listOptions={options}
        text={fullName}
        subText={email}
        arrowDirection="UP"
        menuPortalTarget={document.body}
        DropdownListProps={{
          offset: { left: 20, bottom: 140 },
        }}
        ListProps={{
          elevation: true,
          borderRadius: 24,
        }}
      />
      <RenderEditProfileModal />
      <RenderChangePasswordModal />
    </>
  );
};
