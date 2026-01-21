"use client";

import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <title>
        403
      </title>
      <Result
        status="403"
        title="403 Forbidden"
        subTitle="You don't have permission to access this page."
        extra={
          <Button type="primary" size="large" onClick={() => router.back()}>
            Return to back
          </Button>
        }
      />
    </div>
  );
}