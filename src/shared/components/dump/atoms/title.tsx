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
        className={`text-3xl !font-bold ${color ? `text-${color}` : 'text-secondary-black-color'}`}
      >
        <span className="text-primary-red-color">{redText} </span>
        <span>{title}</span>
      </div>
    </div>
  );
};
