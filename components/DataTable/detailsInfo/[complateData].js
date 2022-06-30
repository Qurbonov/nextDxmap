import { useRouter } from 'next/router';

export default function complateData() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  console.log(id);
  return (
    <h2>
      test
      {/* {router.query.person}'s {router.query.vehicle} */}
    </h2>
  );
}
