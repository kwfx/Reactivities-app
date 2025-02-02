using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command: IRequest
        {
            public required Guid Id { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;
            
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity? dbActivity = await _context.Activities.FindAsync(request.Id);
                if (dbActivity != null)
                {
                    _context.Remove(dbActivity);
                }
                await _context.SaveChangesAsync(cancellationToken);
            }
        }    
    }
}