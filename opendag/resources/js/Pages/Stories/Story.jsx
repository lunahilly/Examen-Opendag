import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import parse from "html-react-parser";

function Story(){
    const story = usePage().props.story;
    console.log(story);
    return (
        <GuestLayout>
            <Head title={`Verhaal van ${story.name}`}/>
            <main className="main wrapper">
                <section className="story">
                    <aside className="story__aside">
                        <img src={story.image} alt={story.name} className="story__aside--image" />
                        <article className="story__aside--wrapper">
                            <h2 className="story__aside--name">{story.name}</h2>
                            <h3 className="story__aside--course">{story.course.name}</h3>
                            <a href={route('stories.index')} className="story__aside--return"><i className="fa-solid fa-arrow-left story__aside--return-icon"/> Ga terug naar verhalen</a>
                        </article>
                    </aside>
                    <article className="story__content">
                        {parse(story.story)}
                    </article>
                </section>
            </main>
        </GuestLayout>
    );
}

export default Story;