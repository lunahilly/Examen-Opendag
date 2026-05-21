import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Activity from "./Activity";

import { useMemo, useState } from "react";

function Activities() {
    const activities = usePage().props.activities;

    // const withoutCourse = activities.filter((item) => item.course_id == null);
    const withoutCourse = activities.filter((item) => item.is_general == true);


    // De JS logica direct binnen de component

    return (
        <GuestLayout>
            <Head title="Activiteiten" />
            <PageTitle title="Activiteiten" />
            <section className="activities__general">
                {
                    withoutCourse.map((activity, index) =>
                        <Activity key={index} data={activity} />
                    )
                }
            </section>
        </GuestLayout>
    );
}


export default Activities;