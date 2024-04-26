import CardModal from './CardModal';

const Card = ({ name, email, photo, phone, contact }) => {
  return (
    <div class="bg-white inline-block rounded-lg p-3 m-3 shadow-md hover:shadow-lg">
      <img alt="{name}" src={photo} />
      <h2 class="text-lg font-medium hover:scale-105">{name}</h2>
      <p class="text-sm font-normal hover:scale-105">{email}</p>
      <p class="text-sm font-normal hover:scale-105">{phone}</p>
      <CardModal contact={contact}/>
    </div>
  );
};

export default Card;