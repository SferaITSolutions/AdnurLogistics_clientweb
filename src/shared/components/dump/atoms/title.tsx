export const TitleText = ({
  title,
  redText,
  color,
}: {
  title: string;
  redText?: string;
  color?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`heading-title-size !font-bold ${color ? `text-${color}` : 'text-secondary-black-color'}`}
      >
        <span className="text-primary-red-color heading-title-size">{redText} </span>
        <span className="heading-title-size">{title}</span>
      </div>
    </div>
  );
};
