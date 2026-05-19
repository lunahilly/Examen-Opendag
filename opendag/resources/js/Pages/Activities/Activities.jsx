import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Activity from "./Activity";

import { useMemo, useState } from "react";

function Activities() {
    const activities = usePage().props.activities;

    const withCourse = activities.filter((item) => item.course_id != null);
    const withoutCourse = activities.filter((item) => item.course_id == null);

    const [open, setOpen] = useState(null);
    // const [openline, setOpenline] = useState(null);

    const openList = (id) => {
        if (open == id) {
            setOpen(null);
            return;
        }
        setOpen(id);
    }


    // De JS logica direct binnen de component
    const groupedData = useMemo(() => {
        const sorted = [...withCourse].sort((a, b) =>
            (a.time || '').localeCompare(b.time || '')
        );

        return sorted.reduce((acc, item) => {
            if (!item.time) return acc; // skip invalid items

            const hour = item.time.split(':')[0] + ':00';

            if (!acc[hour]) {
                acc[hour] = [];
            }

            acc[hour].push(item);
            return acc;
        }, {});
    }, [withCourse]);

    return (
        <GuestLayout>
            <Head title="Activiteiten" />
            <PageTitle title="Activiteiten" />
            <section className="activities__general">
                <button onClick={() => openList(withoutCourse[0].id)} className={`courses__item--dropdown ${open == withoutCourse[0].id ? 'courses__item--dropdown-active' : null}`}>Algemene activiteiten
                    {
                        open == withoutCourse[0].id ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="rotate_180 bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                    }
                </button>
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




            <section className="activities__line">
                <button onClick={() => openList(withCourse[0].id)} className={`courses__item--dropdown ${open == withCourse[0].id ? 'courses__item--dropdown-active' : null}`}>Activiteiten tijdlijn
                    {
                        open == withCourse[0].id ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="rotate_180 bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                    }
                </button>
                {
                    open == withCourse[0].id ?
                        <div className="activities__timeline" /> : null
                }
                {
                    open == withCourse[0].id ?
                        <div className="activities_timelineData">
                            {Object.entries(groupedData).map(([hour, test]) => (
                                <div key={hour} style={{ marginBottom: '24px' }}>
                                    <h3 style={{ color: '#333', borderBottom: '1px solid #ddd' }}>{hour}</h3>

                                    {test.map((activity) => (
                                        <div key={activity.id} style={{ padding: '8px 0', display: 'flex', gap: '15px' }}>
                                            <span style={{ fontWeight: 'bold' }}>{activity.time}</span>
                                            <span> {activity.course.name}</span>
                                            <span style={{ color: '#666' }}>(Type: {activity.activity_type.name})</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div> : null
                }
            </section>

        </GuestLayout>
    );
}


export default Activities;