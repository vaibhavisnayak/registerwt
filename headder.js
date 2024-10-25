document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const sections = document.querySelectorAll('main .about');
    const links = document.querySelectorAll('.sidebar ul li a');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Toggle dark theme
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
    });

    // Highlight active section in sidebar on scroll
    const highlightSection = () => {
        let scrollPosition = window.scrollY + 20; // Adjust for header height
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            // Remove zoom effect from all sections
            section.classList.remove('zoomed');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
                // Add zoom effect to the currently active section
                section.classList.add('zoomed');
            }
        });
    };
    
    // Show/hide sidebar on mobile
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active'); // Toggle sidebar visibility
    });
   
    // Close sidebar when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active'); // Hide sidebar
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', highlightSection);
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });

    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            question.click(); // Trigger click on Enter key
        }
    });
});
