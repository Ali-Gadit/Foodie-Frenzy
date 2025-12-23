import React from 'react'
import { styles } from '../assets/dummyadmin'
import { FiHeart, FiStar, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import { backendUrl } from '../config';

const List = () => {
    const [items,setItems] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    
    // Edit state
    const [editingId, setEditingId] = React.useState(null);
    const [editFormData, setEditFormData] = React.useState({});

    const categories = ["All", "Breakfast", "Lunch", "Dinner", "Mexican", "Italian", "Desserts", "Drinks"];

    React.useEffect(()=>{
        const fetchItems = async () => {
            try {
                const {data} = await axios.get(`${backendUrl}/api/items`);
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchItems()
    },[])

    // DELETE ITEMS
    const handleDelete = async (itemId) => {
        if(!window.confirm("Are you sure you want to delete this item?")) return;
        try{
            await axios.delete(`${backendUrl}/api/items/${itemId}`);
            setItems(prevItems => prevItems.filter(item => item._id !== itemId));
        }catch(error){
            console.error("Error deleting item:", error);
        }
    }

    // EDIT HANDLERS
    const handleEditClick = (item) => {
        setEditingId(item._id);
        setEditFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category
        });
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditFormData({});
    }

    const handleSaveEdit = async (itemId) => {
        try {
            const {data} = await axios.put(`${backendUrl}/api/items/${itemId}`, editFormData);
            setItems(prev => prev.map(item => item._id === itemId ? {...item, ...data} : item));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Failed to update item");
        }
    }

    const handleInputChange = (e) => {
        setEditFormData({...editFormData, [e.target.name]: e.target.value});
    }

    const renderStars = (rating) => 
        [...Array(5)].map((_,i) => (
            <FiStar key={i} className={`text-xl ${i<rating ? 'text-amber-400 fill-current' :'text-amber-100/30'}`}/>
        ))
        
        const filteredItems = selectedCategory === "All" 
            ? items 
            : items.filter(item => item.category === selectedCategory);

        if(loading){
            return(
                <div className={styles.pageWrapper.replace(/bg-gradient-to-br.*/,'').concat('flex items-center justify-center text-amber-100')}>
                    Loading Menu...
                </div>
            )
        }
  return (
    <div className={styles.pageWrapper}>
        <div className='max-w-7xl mx-auto'>
            <div className={styles.cardContainer}>
                <h2 className={styles.title}>Manage Menu Items</h2>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium
                                ${selectedCategory === cat 
                                    ? 'bg-amber-500 text-black border-amber-500 font-bold scale-105 shadow-lg shadow-amber-900/50' 
                                    : 'bg-transparent text-amber-100/70 border-amber-100/20 hover:border-amber-100/50 hover:text-amber-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th}>Image</th>
                                <th className={styles.th}>Name / Description</th>
                                <th className={styles.th}>Category</th>
                                <th className={styles.th}>Price(₹)</th>
                                <th className={styles.th}>Ratings</th>
                                <th className={styles.th}>Hearts</th>    
                                <th className={styles.thCenter}>Actions</th>    
                            </tr>
                        </thead>
                        <tbody>{filteredItems.map( (item) =>(
                            <tr key={item._id} className={styles.tr}>
                                <td className={styles.imgCell}>
                                    <img src={item.imageUrl} alt={item.name} className={styles.img}/>
                                </td>
                                
                                <td className={styles.nameCell}>
                                    {editingId === item._id ? (
                                        <div className='space-y-2'>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={editFormData.name} 
                                                onChange={handleInputChange}
                                                className="w-full bg-[#2a1e1e] border border-amber-500/30 rounded p-2 text-amber-100"
                                            />
                                            <textarea 
                                                name="description" 
                                                value={editFormData.description} 
                                                onChange={handleInputChange}
                                                className="w-full bg-[#2a1e1e] border border-amber-500/30 rounded p-2 text-amber-100 text-sm h-20"
                                            />
                                        </div>
                                    ) : (
                                        <div className='space-y-1'>
                                            <p className={styles.nameText}>{item.name}</p>
                                            <p className={styles.descText}>{item.description}</p>
                                        </div>
                                    )}
                                </td>

                                <td className={styles.categoryCell}>
                                    {editingId === item._id ? (
                                        <select 
                                            name="category" 
                                            value={editFormData.category} 
                                            onChange={handleInputChange}
                                            className="bg-[#2a1e1e] border border-amber-500/30 rounded p-2 text-amber-100"
                                        >
                                            {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    ) : item.category}
                                </td>

                                <td className={styles.categoryCell}>
                                    {editingId === item._id ? (
                                        <input 
                                            type="number" 
                                            name="price" 
                                            value={editFormData.price} 
                                            onChange={handleInputChange}
                                            className="w-20 bg-[#2a1e1e] border border-amber-500/30 rounded p-2 text-amber-100"
                                        />
                                    ) : `₹${item.price}`}
                                </td>

                                <td className={styles.categoryCell}>
                                    <div className='flex gap-1'>{renderStars(item.rating)}</div>
                                </td>
                                <td className={styles.heartsCell}>
                                    <div className={styles.heartsWrapper}>
                                        <FiHeart className='text-xl'/>
                                        <span>{item.hearts}</span>
                                    </div>
                                </td>
                                
                                <td className='p-4 text-center'>
                                    <div className='flex items-center justify-center gap-2'>
                                        {editingId === item._id ? (
                                            <>
                                                <button onClick={() => handleSaveEdit(item._id)} className="text-green-400 hover:text-green-300 p-2 bg-green-900/20 rounded-lg">
                                                    <FiCheck className='text-xl'/>
                                                </button>
                                                <button onClick={handleCancelEdit} className="text-red-400 hover:text-red-300 p-2 bg-red-900/20 rounded-lg">
                                                    <FiX className='text-xl'/>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(item)} className="text-blue-400 hover:text-blue-300 p-2 bg-blue-900/20 rounded-lg transition-colors">
                                                    <FiEdit2 className='text-xl'/>
                                                </button>
                                                <button onClick={()=>{handleDelete(item._id)}} className={styles.deleteBtn}>
                                                    <FiTrash2 className='text-xl'/>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>

                {items.length === 0 && (
                    <div className={styles.emptyState}>
                        No items found in the menu
                    </div>
                )}           
            </div>
        </div>
      
    </div>
  )
}

export default List