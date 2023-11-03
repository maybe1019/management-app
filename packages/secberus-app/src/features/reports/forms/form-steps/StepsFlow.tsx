import React from 'react';
import { CheckBall } from '@secberus/icons';
import { StepSection } from '../ReportForm.styled';
import { StepLine, EmptyCheckBall } from '../ReportForm.styled';
import { ModalStep, StepComponentRefType } from './StepsForm.types';

export const StepsFlow: React.FC<{
  step: number;
  modalSteps: ModalStep[];
  setCurrentStep: (args: string) => void;
  componentRef: StepComponentRefType;
}> = ({ step, modalSteps, componentRef, setCurrentStep }) => {
  React.useEffect(() => {
    setCurrentStep(modalSteps[step]?.name);
  }, [modalSteps, setCurrentStep, step]);
  return (
    <StepSection>
      {modalSteps.map(
        (form: any, index: number) =>
          index <= step && (
            <>
              {index === step ? <EmptyCheckBall /> : <CheckBall />}
              {step > index && index < modalSteps.length - 1 && (
                <StepLine
                  className={'step-line-' + componentRef[form.name]}
                  height={
                    componentRef[form.name] ? componentRef[form.name] - 3 : 44
                  }
                />
              )}
            </>
          )
      )}
    </StepSection>
  );
};
