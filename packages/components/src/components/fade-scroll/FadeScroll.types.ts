export interface FadeScrollProps {
  fadeLeft?: boolean;
  className?: string;
  dataTip?: string;
  dataFor?: string;
  fadeBottom?: boolean;
  // trigger is anything that will force the component to recalculate its height
  trigger?: any;
}
