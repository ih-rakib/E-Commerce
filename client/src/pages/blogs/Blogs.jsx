import blogs from "../../data/blogs.json"


const Blogs = () => {

    return (
        <section className="section__container blog__container">
            <h2 className="section__header">Latest From Blog</h2>
            <p className="section__subheader">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, optio ur, adipisicing elit. Quo.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {
                    blogs.map((blog) => (
                        <article key={blog.id ?? blog.title} className="blog__card">
                            <img src={blog.imageUrl} alt={blog.title ? `${blog.title} cover` : "blog cover"} loading="lazy" />
                            <div className="blog__card__content">
                                <h6>{blog.subtitle}</h6>
                                <h4>{blog.title}</h4>
                                <p>{blog.date}</p>
                            </div>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}

export default Blogs