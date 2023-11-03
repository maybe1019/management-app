import React from 'react';
import { AnyFn } from '@secberus/utils';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingOverlay, Button, Text } from '@secberus/components';
import {
  reportSchedulesApi,
  UpdateReportScheduleApiArg,
  CreateReportScheduleApiArg,
} from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { Flex } from '@chakra-ui/react';
import { StepsFlow } from './form-steps/StepsFlow';
import { useFormSchema } from './ReportForm.schema';
import {
  Wrapper,
  StyledModal,
  FormWrapper,
  ConfirmationModal,
} from './ReportForm.styled';
import { ReportSelectionForm } from './form-steps/ReportSelectionForm.modal.step';
import { CustomizeReportForm } from './form-steps/CustomizeReportForm.modal.step';
import { ConfigureReportForm } from './form-steps/ConfigureReportForm.modal.step';
import {
  ModalStep,
  StepComponentRefType,
  ReportScheduleWithRecords,
} from './form-steps/StepsForm.types';

interface SteppedReportingModalProps {
  isEdit?: boolean;
  onClose: AnyFn;
}

export const SteppedReportingModal: React.FC<SteppedReportingModalProps> = ({
  onClose,
  isEdit = false,
}) => {
  const { reportId } = useParams<{ reportId?: string }>();
  const [showForm, setShowmForm] = React.useState(true);
  const [showConfirmationModal, setConfirmationModal] = React.useState(false);
  const [stepComponentRef, setStepComponentRef] =
    React.useState<StepComponentRefType>({});
  const { data: report, isLoading: isReportLoading } =
    reportSchedulesApi.useGetReportScheduleQuery(
      { reportId: reportId! },
      { skip: !reportId }
    );
  const defaultValues = {
    name: '',
    type: '',
    emails: [],
    frameworks: [],
    interval: 'WEEKLY',
    header_image: null,
    include_recommendations: false,
    ...(report && {
      ...report,
      frameworks: !Array.isArray(report?.frameworks) ? [] : report?.frameworks,
      emails: report?.emails?.map(({ email }) => email),
    }),
  };

  const [step, setStep] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState('');
  const validationSchema = useFormSchema(currentStep);

  const { register, control, handleSubmit, watch, errors } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const watchValues = watch();

  const [createReport, createReportSchedule] =
    reportSchedulesApi.useCreateReportScheduleMutation();
  const [updateReport, updateReportSchedule] =
    reportSchedulesApi.useUpdateReportScheduleMutation();
  const [deleteReport, deleteReportSchedule] =
    reportSchedulesApi.useDeleteReportScheduleMutation();
  const isLoading = useIsLoading([
    isReportLoading,
    createReportSchedule.isLoading,
    updateReportSchedule.isLoading,
    deleteReportSchedule.isLoading,
  ]);

  const handleStepIncrement = React.useCallback(
    (stepChange: number | 'PREV' | 'NEXT') => {
      if (typeof stepChange === 'number') {
        setStep(stepChange);
      } else {
        setStep(stepChange === 'NEXT' ? step + 1 : step - 1);
      }
    },
    [step]
  );

  const ModalSteps: ModalStep[] = [
    {
      name: 'select',
      title: 'Select report type',
      RenderComponent: ReportSelectionForm,
      key: 'report_selection_form',
    },
    {
      name: 'customize',
      title: 'Customize report',
      RenderComponent: CustomizeReportForm,
      key: 'customize_form',
    },
    {
      name: 'configure',
      title: 'Configure report',
      RenderComponent: ConfigureReportForm,
      key: 'configure_report',
    },
  ];

  const onDelete = async () => {
    if (!report?.id) return;
    await deleteReport({ reportId: report.id });
    onClose?.();
  };

  React.useEffect(() => {
    if (isEdit) {
      setStep(ModalSteps.length);
    }
  }, [isEdit, setStep, ModalSteps.length]);

  const onSubmit = async (_formData: ReportScheduleWithRecords) => {
    if (!isEdit) {
      const formData: CreateReportScheduleApiArg['createReportSchedule'] = {
        interval: _formData?.interval?.id || watchValues?.interval,
        type: _formData.type,
        name: _formData.name,
        emails: _formData.emails,
        frameworks: _formData?.frameworks,
        header_image: _formData?.header_image,
        include_recommendations:
          _formData?.include_recommendations ||
          defaultValues.include_recommendations,
      };
      const { id } = await createReport({
        createReportSchedule: formData,
      }).unwrap();
      if (id) {
        if (formData?.interval === 'ONCE') {
          setShowmForm(false);
          setConfirmationModal(true);
        } else {
          onClose();
        }
      }
    } else {
      const formData: UpdateReportScheduleApiArg['updateReportSchedule'] = {
        interval: _formData?.interval?.id || report?.interval,
        name: _formData.name,
        include_recommendations: _formData?.include_recommendations,
        emails: _formData.emails,
        frameworks: _formData?.frameworks,
      };
      report?.id &&
        updateReport({
          updateReportSchedule: formData,
          reportId: report.id,
        }).then(r => {
          onClose?.();
        });
    }
  };

  if (isLoading) return <LoadingOverlay />;
  const props = {
    isEdit,
    errors,
    control,
    register,
    handleSubmit,
    handleStepIncrement,
    report: {
      ...watchValues,
      header_image: report?.header_image,
    },
    setStepComponentRef,
  };

  return (
    <>
      <StyledModal
        handleClose={onClose}
        title={isEdit ? 'Edit Report' : ModalSteps[step]?.title}
        isVisible={showForm}
        variant="light"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            {ModalSteps[step]?.name !== 'select' && (
              <StepsFlow
                step={step}
                modalSteps={ModalSteps}
                componentRef={stepComponentRef}
                setCurrentStep={setCurrentStep}
              />
            )}
            <FormWrapper>
              {ModalSteps.map(({ RenderComponent, name, ...rest }, index) => {
                return (
                  <RenderComponent
                    {...props}
                    {...rest}
                    isCompleted={index < step}
                    isCurrent={index === step}
                    handleEdit={() => setStep(index)}
                  />
                );
              })}
              {/* if we're on the last step */}
              {(step + 1 === ModalSteps.length ||
                (isEdit && step === ModalSteps.length)) && (
                <Flex pt="48px" gridGap="8px" justifyContent="right">
                  <Button variant="primary" type="submit">
                    {isEdit ? 'Save changes' : 'Create report'}
                  </Button>
                  {isEdit && (
                    <Button variant="destructive" onClick={onDelete}>
                      Delete report
                    </Button>
                  )}
                </Flex>
              )}
            </FormWrapper>
          </Wrapper>
        </form>
      </StyledModal>
      <ConfirmationModal
        isVisible={createReportSchedule.isSuccess && showConfirmationModal}
        variant="light"
        handleClose={onClose}
        title="Report generation in progress"
      >
        <Text type="small-regular">
          The report you requested is being generated. This process could take
          up to 15 minutes. You will receive an email when the report is ready
          to download.
        </Text>
        <Flex pt="48px" gridGap="8px" justifyContent="left">
          <Button variant="primary" type="button" onClick={onClose}>
            Close
          </Button>
        </Flex>
      </ConfirmationModal>
    </>
  );
};
