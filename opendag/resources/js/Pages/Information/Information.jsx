import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";

function Information(){
    return(
        <GuestLayout>
            <PageTitle title="Informatie per opleiding"/>
            <section className="courses">
                <div className="courses__item">
                    <div className="courses__item--dropdown"><button className="courses__item--dropdown-button">drop</button></div>
                    <div className="course">
                        <p className="course__info">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod recusandae eveniet provident molestias similique fuga possimus qui assumenda nisi aut, ea quis quaerat sequi facere cum ipsa quia dolorum exercitationem.
                        </p>
                        <span className="course__wrapper">
                            <div className="course__details">
                                
                            </div>
                            <img src="" alt="" className="course__image" />
                        </span>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Information; 