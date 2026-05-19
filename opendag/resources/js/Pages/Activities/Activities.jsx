import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Activity from "./Activity";

import { useMemo, useState } from "react";

function Activities() {
    const activities = usePage().props.activities;

    const withoutCourse = activities.filter((item) => item.course_id == null);


    // De JS logica direct binnen de component

    return (
        <GuestLayout>
            <Head title="Activiteiten" />
            <PageTitle title="Activiteiten" />
            <section className="activities__general">
                {
                    withoutCourse.map((activity, index) =>
                        <>
                            {
                                open == withoutCourse[0].id ?
                                    <Activity data={activity} key={index} />
                                    : null
                            }
                        </>
                    )
                }
            </section>
        </GuestLayout>
    );
}


export default Activities;