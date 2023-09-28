export default function ListItem({
  leading,
  trailing,
  mainTitle,
  subTitle,
  mainTitleStyle,
  subTitleStyle,
  centered = false,
  appendClass,
  appendParentClass,
}) {
  return (
    <div
      className={`flex justify-between items-center w-full ${
        appendParentClass ? appendParentClass : ''
      }`}>
      <div
        className={`flex items-center w-full ${
          appendClass ? appendClass : ''
        }`}>
        {leading && <div>{leading}</div>}
        <div
          className={`flex flex-col w-full ${centered ? 'items-center' : ''}`}>
          <span className={mainTitleStyle}>{mainTitle}</span>
          <span className={subTitleStyle}>{subTitle}</span>
        </div>
      </div>
      {trailing && <div className='flex'>{trailing}</div>}
    </div>
  );
}
