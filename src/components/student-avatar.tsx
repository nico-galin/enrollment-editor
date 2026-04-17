interface StudentAvatarProps {
  photo?: string;
  name: string;
  className?: string;
  letterClassName?: string;
}

export function StudentAvatar({ photo, name, className, letterClassName }: StudentAvatarProps) {
  return (
    <div className={className}>
      {photo ? (
        <img src={photo} className='w-full h-full object-cover' />
      ) : (
        <span className={letterClassName}>{name.charAt(0)}</span>
      )}
    </div>
  );
}
