import './header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'>Not your Mom's blog</span>
        <span className='headerTitleLg'>glob</span>
      </div>
      <img
        className='headerImg'
        src='https://images.unsplash.com/photo-1622266926096-8ba60d5534cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1742&q=80'
        alt=''
      />
    </div>
  );
}
