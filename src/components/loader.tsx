import { UseInfiniteScroll } from "@/hooks/useInfiniteScroll";

type LoaderProps = Pick<UseInfiniteScroll, "isLoading" | "loadMoreCallback" | "isLastPage">;
 
export default function Loader({
 isLoading,
 isLastPage,
 loadMoreCallback,
}: LoaderProps) {
 if (isLoading) return <p className="text-center text-white w-3/5 pb-20 mt-10">Loading...</p>;
 
 if (isLastPage) return <p className="text-center text-white w-3/5 pb-20">End of content</p>;
 
 return <div ref={loadMoreCallback}>load more callback</div>;
};