interface SkeletonListProps {
  listLength: number;
}

const LOADING_TEXT = 'Pokemon incoming!';

const SkeletonList: React.FC<SkeletonListProps> = (props) => {
  const { listLength } = props;
  const skeletonItems = Array.from({ length: listLength }, (_, index) => (
    <div key={index}>{LOADING_TEXT}</div>
  ));
  return <div>{skeletonItems}</div>;
};

export default SkeletonList;
