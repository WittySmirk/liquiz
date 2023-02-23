import { createServerData$ } from "solid-start/server";
import { Outlet } from "solid-start";
import { testset } from "~/utils/testset";
import type { TestSet } from "~/utils/testset";

export function routeData() {   
    return createServerData$(() => testset as TestSet);
}

export default function UserLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}