import BlogImg from '../../../assets/img/blog';

const Blog = () => {
    return (
        <section id="blog" className="section">
		<div className="container">
			<h4>Our Blog</h4>
			<div className="row">
				<div className="span3">
					<div className="home-post">
						<div className="post-image">
							<img className="max-img" src={BlogImg.Img1} alt="" />
						</div>
						<div className="post-meta">
							<i className="icon-file icon-2x"></i>
							<span className="date">June 19, 2013</span>
							<span className="tags"><a href="/#">Design</a>, <a href="/#">Blog</a></span>
						</div>
						<div className="entry-content">
							<h5><strong><a href="/#">New design trends</a></strong></h5>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. &hellip;
							</p>
							<a href="/#" className="more">Read more</a>
						</div>
					</div>
				</div>
				<div className="span3">
					<div className="home-post">
						<div className="post-image">
							<img className="max-img" src={BlogImg.Img2} alt="" />
						</div>
						<div className="post-meta">
							<i className="icon-file icon-2x"></i>
							<span className="date">June 19, 2013</span>
							<span className="tags"><a href="/#">Design</a>, <a href="/#">News</a></span>
						</div>
						<div className="entry-content">
							<h5><strong><a href="/#">Retro is great</a></strong></h5>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. &hellip;
							</p>
							<a href="/#" className="more">Read more</a>
						</div>
					</div>
				</div>
				<div className="span3">
					<div className="home-post">
						<div className="post-image">
							<img className="max-img" src={BlogImg.Img3} alt="" />
						</div>
						<div className="post-meta">
							<i className="icon-file icon-2x"></i>
							<span className="date">June 22, 2013</span>
							<span className="tags"><a href="/#">Design</a>, <a href="/#">Tips</a></span>
						</div>
						<div className="entry-content">
							<h5><strong><a href="/#">Isometric mockup</a></strong></h5>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. &hellip;
							</p>
							<a href="/#" className="more">Read more</a>
						</div>
					</div>
				</div>
				<div className="span3">
					<div className="home-post">
						<div className="post-image">
							<img className="max-img" src={BlogImg.Img4} alt="" />
						</div>
						<div className="post-meta">
							<i className="icon-file icon-2x"></i>
							<span className="date">June 27, 2013</span>
							<span className="tags"><a href="/#">News</a>, <a href="/#">Tutorial</a></span>
						</div>
						<div className="entry-content">
							<h5><strong><a href="/#">Free icon set</a></strong></h5>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. &hellip;
							</p>
							<a href="/#" className="more">Read more</a>
						</div>
					</div>
				</div>
			</div>
			<div className="blankdivider30"></div>
			<div className="aligncenter">
				<a href="/#" className="btn btn-large btn-theme">More blog post</a>
			</div>
		</div>
	</section>
    );
};

export default Blog;