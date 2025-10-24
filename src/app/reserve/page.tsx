// src/app/reserve/page.tsx
import PageHeader from "@/components/PageHeader";
import Container from "@/components/layout/Container";

export default function ReservePage() {
  return (
    <>
      <PageHeader title="예약" description={<>준비 중입니다.</>} variant="split" />
      <main className="py-10">
        <Container>예약 페이지가 곧 제공됩니다.</Container>
      </main>
    </>
  );
}