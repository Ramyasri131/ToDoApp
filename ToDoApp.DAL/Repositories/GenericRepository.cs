using Microsoft.EntityFrameworkCore;
using ToDoApp.DAL.Interfaces;
using ToDoApp.DAL.Models;

namespace ToDoApp.DAL.Repositories
{
    public class GenericRepository<T>(ApplicationDbContext dbContext) :IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _dbContext=dbContext;

        public async Task<List<T>> GetAll()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<T?> GetById(object id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

    }
}
