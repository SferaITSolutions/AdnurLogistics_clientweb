export default function UserDetails({
  userName,
  userPhone,
  onClick,
}: {
  userName: string;
  userPhone: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col cursor-pointer gap-0" onClick={onClick}>
      <h1 className="text-lg font-semibold !mb-0">{userName}</h1>
      <p className="text-sm !mb-0">{userPhone}</p>
    </div>
  );
}
