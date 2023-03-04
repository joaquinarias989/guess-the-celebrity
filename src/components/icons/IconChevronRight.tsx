export type Props = {
  className?: string;
  size?: number;
};

export default function IconChevronRight(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`${props.size != undefined ? props.size : 'w-6 h-6'} ${
        props.className
      }`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
      />
    </svg>
  );
}
